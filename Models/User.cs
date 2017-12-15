using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace oshop.Models
{
    public class User
    {
        public User()
        {
            UserAddress = new Collection<UserAddress>();
        }
        public int Id { get; set; }
        public string UserName { get; set; }

        public ICollection<UserAddress> UserAddress { get; set; }

    }
}