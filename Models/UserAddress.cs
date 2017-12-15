namespace oshop.Models
{
    public class UserAddress
    {
        public int Id { get; set; }
        public string AddressName { get; set; }

        public User User { get; set; }
        public int  UserId { get; set; }
    }
}