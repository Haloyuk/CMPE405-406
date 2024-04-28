import React from "react";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const { setSelectedConversation } = useConversation();
    const { conversations } = useGetConversations();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;
        if (search.length < 3) {
            return toast.error("Search query must be at least 3 characters");
        }

        const conversation = conversations.find((c) => {
            return c.fullName.toLowerCase().includes(search.toLowerCase());
        });

        if (conversation) {
            setSelectedConversation(conversation);
            setSearch("");
        } else {
            toast.error("User not found");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search1">
            <input
                type="text"
                placeholder="Search..."
                className="search2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="search3">
                <FaSearch />
            </button>
        </form>
    );
};
export default SearchInput;
