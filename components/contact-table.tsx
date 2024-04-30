const ContactTable = () => {
  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-sm text-gray-700 uppercase bg-gray-50">
        <tr>
          <th className="py-3 px-6">#</th>
          <th className="py-3 px-6">Name</th>
          <th className="py-3 px-6">Phone Number</th>
          <th className="py-3 px-6">Created at</th>
          <th className="py-3 px-6 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="py-3 px-6"></td>
          <td className="py-3 px-6"></td>
          <td className="py-3 px-6"></td>
          <td className="py-3 px-6"></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};

export default ContactTable;
