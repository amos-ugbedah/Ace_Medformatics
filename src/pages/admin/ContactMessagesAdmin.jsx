// src/pages/admin/ContactMessagesAdmin.jsx
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ContactMessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch all messages
  async function fetchMessages() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to fetch messages.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  // Update status (unread, read, replied)
  async function updateStatus(id, status) {
    setActionLoading(true);
    try {
      const { error } = await supabase
        .from("contact_messages")
        .update({ status, updated_at: new Date() })
        .eq("id", id);

      if (error) throw error;

      // Update UI state
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, status } : msg))
      );
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status });
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to update status.");
    } finally {
      setActionLoading(false);
    }
  }

  // Delete message permanently
  async function deleteMessage(id) {
    if (!confirm("Are you sure you want to delete this message?")) return;

    setActionLoading(true);
    try {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to delete message.");
    } finally {
      setActionLoading(false);
    }
  }

  // Reply via email
  function replyByEmail(msg) {
    updateStatus(msg.id, "replied");
    window.location.href = `mailto:${msg.email}?subject=Re: ${encodeURIComponent(
      msg.subject
    )}`;
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
      {/* MESSAGE LIST */}
      <div className="lg:col-span-1">
        <h1 className="mb-4 text-2xl font-semibold text-acePurple">
          Contact Messages
        </h1>

        {loading && <p className="text-gray-500">Loading messages...</p>}
        {errorMsg && <p className="text-red-600">{errorMsg}</p>}

        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => {
                setSelectedMessage(msg);
                if (msg.status === "unread") updateStatus(msg.id, "read");
              }}
              className={`cursor-pointer rounded-lg p-4 border shadow-sm transition
                ${
                  msg.status === "unread"
                    ? "bg-aceGreen/10 border-aceGreen"
                    : "bg-white dark:bg-gray-800"
                }
              `}
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-800 dark:text-white">
                  {msg.full_name}
                </p>
                <span className="text-xs text-gray-500 capitalize">
                  {msg.status || "unread"}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">{msg.subject}</p>
              <p className="mt-1 text-xs text-gray-400">
                {new Date(msg.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* MESSAGE DETAILS */}
      <div className="lg:col-span-2">
        {!selectedMessage ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a message to view details
          </div>
        ) : (
          <div className="p-6 bg-white shadow dark:bg-gray-800 rounded-xl">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {selectedMessage.subject}
              </h2>
              <p className="text-sm text-gray-600">
                From: <strong>{selectedMessage.full_name}</strong> (
                {selectedMessage.email})
              </p>
              <p className="mt-1 text-xs text-gray-400">
                {new Date(selectedMessage.created_at).toLocaleString()}
              </p>
            </div>

            <div className="pt-4 text-gray-700 whitespace-pre-line border-t dark:text-gray-300">
              {selectedMessage.message}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={() => replyByEmail(selectedMessage)}
                className="px-4 py-2 text-white rounded-md bg-acePurple hover:opacity-90"
              >
                Reply via Email
              </button>

              <button
                onClick={() => updateStatus(selectedMessage.id, "read")}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Mark as Read
              </button>

              <button
                onClick={() => updateStatus(selectedMessage.id, "unread")}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Mark as Unread
              </button>

              <button
                onClick={() => updateStatus(selectedMessage.id, "replied")}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Mark as Replied
              </button>

              <button
                onClick={() => deleteMessage(selectedMessage.id)}
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:opacity-90"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
