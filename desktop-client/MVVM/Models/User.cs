using MVVM.Scripts.API;

namespace MVVM.Models
{
    internal class User : Model
    {
        
        public string login { get; set; }
        public string? password { get; set; }
        public int clientId { get; set; }
        public string clientSecret { get; set; }
        public string accessToken { get; set; }

        public User(int id, string login, string password, string accessToken) : base(id)
        {
            this.login = login;
            this.password = password;
            this.clientId = Constants.CLIENT_ID;
            this.clientSecret = Constants.CLIENT_SECRET;
            this.accessToken = accessToken;
        }
    }
}
