using System;
using Amazon.Lambda.Core;
using Amazon.Lambda.Serialization.Json;
using Amazon.S3;

namespace ReadCSV
{
    public class Handler
    {
        [LambdaSerializer(typeof(JsonSerializer))]
        public Result Handle(Request request)
        {
            return new Result
            {
                HelloWorld = request.Name
            };
        }
    }

    public class Request
    {
        public string Name { get; set; }
    }

    public class Result
    {
        public string HelloWorld { get; set; }
    }
}