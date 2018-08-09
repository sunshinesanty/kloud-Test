using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.Lambda.Core;
using Amazon.Lambda;
using Amazon.Lambda.S3Events;
// using Amazon.Lambda.Serialization.Json;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.SimpleNotificationService;
using Amazon.SimpleNotificationService.Model;

namespace ReadCSV
{
    public class Handler
    {
        private readonly List<string> _supportedInputTypes = new List<string>() { ".csv" };
        private readonly AmazonS3Client _s3Client;

        public Handler()
        {
            _s3Client = new AmazonS3Client();
        }

        public async Task Handle(S3Event s3Event, ILambdaContext context)
        {
            foreach (var record in s3Event.Records)
            {
                if (!_supportedInputTypes.Contains(Path.GetExtension(record.S3.Object.Key).ToLower()))
                {
                    Console.WriteLine(
                        $"Object {record.S3.Bucket.Name}:{record.S3.Object.Key} is not a supported image type");
                    continue;
                }

                Console.WriteLine($"Determining whether Input file {record.S3.Bucket.Name}:{record.S3.Object.Key} has required fields");

                // Get the existing tag set
                var taggingResponse = await _s3Client.GetObjectTaggingAsync(new GetObjectTaggingRequest
                {
                    BucketName = record.S3.Bucket.Name,
                    Key = record.S3.Object.Key
                });

                if (taggingResponse.Tagging.Any(tag => tag.Key == "Processed" && tag.Value == "true"))
                {
                    Console.WriteLine(
                        $"Input file {record.S3.Bucket.Name}:{record.S3.Object.Key} has already been processed");
                    continue;
                }

                // Get the existing image
                using (var objectResponse = await _s3Client.GetObjectAsync(record.S3.Bucket.Name, record.S3.Object.Key))
                using (Stream responseStream = objectResponse.ResponseStream)
                {
                    Console.WriteLine($"Reading CSV File {record.S3.Bucket.Name}:{record.S3.Object.Key}");

                    using (StreamReader streamReader = new StreamReader(responseStream))
                    {
                        List<string> Headers = new List<string>();
                        int lineIndx = 0;
                        while (!streamReader.EndOfStream)
                        {
                            try
                            {
                                var line = streamReader.ReadLine();
                                // this program epxects the first line to be header
                                if (lineIndx == 0)
                                {
                                    Headers = ExtractHeader(line);
                                }

                                var data = line.Split(new[] { ',', ';' });
                                if (data != null)
                                {
                                    for (int colIdx = 0; colIdx < Headers.Count; colIdx++)
                                    {
                                        var person = new Person() { Name = data[colIdx], Phone = data[colIdx] };
                                        Console.WriteLine($"Sending SMS to {person}");
                                        string template = System.Environment.GetEnvironmentVariable("SMS_TEMPLATE");
                                        SendMessageToMobileAsync(
                                            person.Phone,
                                            string.IsNullOrWhiteSpace(template) ?
                                                $"Hello {person.Name}" :
                                                string.Format(template, person.Name)
                                        ).Wait();
                                    }
                                }
                                else
                                {
                                    throw new ArgumentException($@"The data provided on line {lineIndx} is incorrect. 
                                Please it  must be in the format of <name>;<phoneno>; {Environment.NewLine} 
                                The first line of the file will be omiited as it expects it to be the header");
                                }
                            }
                            catch (Exception ex)
                            {
                                LogError(ex, $"Error occured processing the request for line {lineIndx}.");
                            }
                        }
                    }

                    // Upload the compressed image back to S3
                    Console.WriteLine($"Tagging completion of reading CSV {record.S3.Bucket.Name}:{record.S3.Object.Key}");
                    await _s3Client.PutObjectTaggingAsync(new PutObjectTaggingRequest
                    {
                        BucketName = record.S3.Bucket.Name,
                        Key = record.S3.Object.Key,
                        Tagging = new Tagging
                        {
                            TagSet = new List<Tag> {
                                    new Tag
                                    {
                                        Key = "Processed",
                                        Value = "true"
                                    }
                                }
                        }
                    });

                }
            }
        }

        public static async Task<PublishResponse> SendMessageToMobileAsync(string mobileNumber, string message)
        {
            var client = new AmazonSimpleNotificationServiceClient();
            var messageAttributes = new Dictionary<string, MessageAttributeValue>();
            var smsType = new MessageAttributeValue
            {
                DataType = "String",
                StringValue = "Transactional"
            };

            messageAttributes.Add("AWS.SNS.SMS.SMSType", smsType);

            PublishRequest request = new PublishRequest
            {
                Message = message,
                PhoneNumber = mobileNumber,
                MessageAttributes = messageAttributes
            };

            return await client.PublishAsync(request);
        }

        private static List<string> ExtractHeader(string HeaderLine)
        {
            List<string> headers = new List<string>();
            if (HeaderLine != null && HeaderLine.Split(new[] { ',', ';' }).Length > 0)
            {
                headers.AddRange(HeaderLine.Split(new[] { ',', ';' }));
            }
            return headers;
        }

        private static void LogError(Exception ex, string customMessage = "")
        {
            string CorrelationId = $"Error {Guid.NewGuid().ToString("N")} -";
            if (customMessage != string.Empty)
                Console.WriteLine($"{CorrelationId} {customMessage}");
            Console.WriteLine($"{CorrelationId} Message: {ex.Message}");
            Console.WriteLine($"{CorrelationId} Stack Trace: {ex.StackTrace}");
        }
    }


    public class Person
    {
        public string Name { get; set; }
        public string Phone { get; set; }

        public override string ToString()
        {
            return $"{this.Name}. Phone number {this.Phone}";
        }
    }

}

