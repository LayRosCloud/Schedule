using MVVM.Scripts.API;

namespace MVVM.Models
{
    internal class UserAuth
    {
        public string login { get; set; }
        public string password { get; set; }
        public int clientId { get; set; }
        public string clientSecret { get; set; }

        public UserAuth(string login, string password)
        {
            this.login = login;
            this.password = password;
            clientId = Constants.CLIENT_ID;
            clientSecret = Constants.CLIENT_SECRET;
        }
    }
}
