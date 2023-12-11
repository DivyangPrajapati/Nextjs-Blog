// Error: Hydration failed because the initial UI does not match what was rendered on the server.
// @LINK: https://nextjs.org/docs/messages/react-hydration-error
import { useEffect, useState } from "react";

function hydrationFixUtil() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return false;
  }

  return true;
}

export default hydrationFixUtil;
