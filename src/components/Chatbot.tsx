
import React, { useEffect } from "react";
import { MessageCircle } from "lucide-react";

const Chatbot = () => {
  useEffect(() => {
    (function () {
      if (!window.chatbase || window.chatbase("getState") !== "initialized") {
        window.chatbase = (...args) => {
          if (!window.chatbase.q) {
            window.chatbase.q = [];
          }
          window.chatbase.q.push(args);
        };
        window.chatbase = new Proxy(window.chatbase, {
          get(target, prop) {
            if (prop === "q") {
              return target.q;
            }
            return (...args) => target(prop, ...args);
          },
        });
      }
      const onLoad = function () {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "h_PFW32OLrzQxff1pFdAe";
        script.dataset.domain = "www.chatbase.co";
        document.body.appendChild(script);
      };
      if (document.readyState === "complete") {
        onLoad();
      } else {
        window.addEventListener("load", onLoad);
      }
    })();
  }, []);

  return (
    <button
      className="fixed right-6 bottom-6 bg-auto-blue hover:bg-blue-800 text-white rounded-full p-4 shadow-lg z-50"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
};

export default Chatbot;
