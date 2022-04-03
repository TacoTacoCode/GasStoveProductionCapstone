using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Firebase.Auth;
using Firebase.Storage;
using Microsoft.Extensions.Configuration;


namespace GSP_API.Business.Extensions
{
    class FireBaseUtil
    {
        private static readonly Dictionary<string, string> FirebaseInfo = new()
        {
            { "ApiKey", "AIzaSyB3X-AbGDNGBIl-3WROnf-cnn9D5eChH6Q" },
            { "Bucket", "gspspring2022.appspot.com" },
            { "AuthEmail", "truongquoclap3008@gmail.com" },
            { "AuthPassword", "38200283tql" }
        };

        public static async Task<string> Upload(Stream stream, string fileName)
        {
            var auth = new FirebaseAuthProvider(new FirebaseConfig(FirebaseInfo["ApiKey"]));
            var a = await auth.SignInWithEmailAndPasswordAsync(FirebaseInfo["AuthEmail"], FirebaseInfo["AuthPassword"]);

            // you can use CancellationTokenSource to cancel the upload midway
            var cancellation = new CancellationTokenSource();

            var task = new FirebaseStorage(
                FirebaseInfo["Bucket"],
                new FirebaseStorageOptions
                {
                    AuthTokenAsyncFactory = () => Task.FromResult(a.FirebaseToken),
                    ThrowOnCancel = true // when you cancel the upload, exception is thrown. By default no exception is thrown
                })
                .Child("Images")
                .Child(fileName)
                .PutAsync(stream);
            //task.Progress.ProgressChanged += (s, e) => Console.WriteLine($"Progress: {e.Percentage} %");
            try
            {
                string link = await task;
                return link;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public static async Task<string> GetImageUrl(string imageName)
        {
            var auth = new FirebaseAuthProvider(new FirebaseConfig(FirebaseInfo["ApiKey"]));
            var a = await auth.SignInWithEmailAndPasswordAsync(FirebaseInfo["AuthEmail"], FirebaseInfo["AuthPassword"]);

            // you can use CancellationTokenSource to cancel the upload midway
            var cancellation = new CancellationTokenSource();

            var task = new FirebaseStorage(
                FirebaseInfo["Bucket"],
                new FirebaseStorageOptions
                {
                    AuthTokenAsyncFactory = () => Task.FromResult(a.FirebaseToken),
                    ThrowOnCancel = true // when you cancel the upload, exception is thrown. By default no exception is thrown
                })
                .Child("Images")
                .Child(imageName);
            try
            {
                string link = await task.GetDownloadUrlAsync();
                return link;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
