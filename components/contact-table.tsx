import { getContacts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { EditButton, DeleteButton } from "./button";
import { HiChevronUpDown } from "react-icons/hi2";

const ContactTable = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const contacts = await getContacts(query, currentPage);
  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-sm text-gray-700 uppercase bg-gray-50">
        <tr>
          <th className="py-3 px-6">#</th>
          <th className="py-3 px-6 cursor-pointer">First Name &#x1F53C;</th>
          <th className="py-3 px-6 cursor-pointer">Last Name &#x1F53C;</th>
          <th className="py-3 px-6 cursor-pointer">Email &#x1F53C;</th>
          <th className="py-3 px-6 cursor-pointer">Phone Number &#x1F53C;</th>
          <th className="py-3 px-6">Created at</th>
          <th className="py-3 px-6 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact, index) => (
          <tr key={contact.id} className="bg-white border-b">
            <td className="py-3 px-6">{index + 1}</td>
            <td className="py-3 px-6 capitalize">{contact.firstName}</td>
            <td className="py-3 px-6 capitalize">{contact.lastName}</td>
            <td className="py-3 px-6 capitalize">{contact.email}</td>
            <td className="py-3 px-6 capitalize">{contact.phone}</td>
            <td className="py-3 px-6">
              {formatDate(contact.createdAt.toString())}
            </td>
            <td className="flex justify-center gap-1 py-3">
              <EditButton id={contact.id} />
              <DeleteButton id={contact.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContactTable;
