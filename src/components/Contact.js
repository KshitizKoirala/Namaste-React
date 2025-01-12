const Contact = () => {
  return (
    <div className="font-bold text-2xl p-3 m-4">
      <h1>Contact Us</h1>
      <p>Phone: 1234567890</p>
      <p>Email:</p>
      <form>
        <input
          type="text"
          className="border border-black p-2 m-2"
          placeholder="Name"
        />
        <input
          type="text"
          className="border border-black p-2 m-2"
          placeholder="Message"
        />
        <button className="border border-black p-2 m-2 bg-gray-100 rounded-lg">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
