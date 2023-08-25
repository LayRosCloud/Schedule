using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace MVVM.Scripts;

public class FileCrypt
{
    public void WriteText(string text, string path = "data")
    {
        FileStream stream = new FileStream(path, FileMode.OpenOrCreate, FileAccess.Write);

        var cryptic = new DESCryptoServiceProvider();

        cryptic.Key = Encoding.ASCII.GetBytes("ABCDEFGH");
        cryptic.IV = Encoding.ASCII.GetBytes("ABCDEFGH");

        CryptoStream crStream = new CryptoStream(stream,
            cryptic.CreateEncryptor(),CryptoStreamMode.Write);


        byte[] data = Encoding.ASCII.GetBytes(text);

        crStream.Write(data,0,data.Length);

        crStream.Close();
        stream.Close();
    }
    
    public string ReadText(string path = "data")
    {
        try
        {
            FileStream stream = new FileStream(path,
                FileMode.Open, FileAccess.Read);

            var cryptic = new DESCryptoServiceProvider();

            cryptic.Key = Encoding.ASCII.GetBytes("ABCDEFGH");
            cryptic.IV = Encoding.ASCII.GetBytes("ABCDEFGH");

            CryptoStream crStream = new CryptoStream(stream,
                cryptic.CreateDecryptor(), CryptoStreamMode.Read);

            StreamReader reader = new StreamReader(crStream);

            string data = reader.ReadToEnd();

            reader.Close();
            stream.Close();
            return data;

        }
        catch (Exception)
        {
            return "";
        }
        
    }

    public void DeleteFile(string path)
    {
        File.Delete(path);
    }
}