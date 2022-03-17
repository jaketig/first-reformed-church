import React, {useState, useEffect} from 'react';
import AdminLayout from "../../components/AdminLayout";
import fetchJson from "../../lib/fetchJson";

function AccountVerification() {


  const [pendingUsers, setPendingUsers] = useState(0);
  useEffect(() => {
    (async function() {
      const pendingUsers = await fetchJson("/api/account-verification/pending-users", { method: "GET" });
      setPendingUsers(pendingUsers.length)
    })();
  }, []);

  return (
    <>
      Account Verification

      <pre>{JSON.stringify(pendingUsers, undefined, 2)}</pre>
    </>
  )
}

AccountVerification.Layout = AdminLayout

export default AccountVerification