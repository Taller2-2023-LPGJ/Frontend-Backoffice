import React from "react";
import "./user_metrics.scss";

interface IframeInfo {
  src: string;
  title: string;
}

interface IframeListProps {
  iframes: IframeInfo[];
}

const IframeList: React.FC<IframeListProps> = ({ iframes }) => {
  return (
    <div
      style={{
        overflowX: "auto",
        overflowY: "hidden",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
        {iframes.map((iframe, index) => (
          <div
            key={index}
            style={{ width: "50%", padding: "10px", boxSizing: "border-box" }}
          >
            <h3>{iframe.title}</h3>
            <iframe
              src={iframe.src}
              width="100%"
              height="305"
              title={iframe.title}
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

const iframes: IframeInfo[] = [
  {
    src: "https://us5.datadoghq.com/graph/embed?token=0986698e41b06a879cf6406a252c07095dd74eff0d5f229f4151aa6094781bf2&height=300&width=600&legend=true",
    title: "Incomplete Account Creations",
  },
  {
    src: "https://us5.datadoghq.com/graph/embed?token=7eab5ca033d5613bedddae4e03494bb11fbad88c879ee7396d5612aacfb153a3&height=300&width=600&legend=true",
    title: "Successful Registrations (Non-Google Sign-Up)",
  },
  {
    src: "https://us5.datadoghq.com/graph/embed?token=c419b7ae7d270170d9bb8c3cbe76a0b364c40fe40e6b6caee5e3cb48159e8672&height=300&width=600&legend=true",
    title: "Average Registration Time (Non-Google Sign-Up)",
  },
  {
    src: "https://us5.datadoghq.com/graph/embed?token=869c86bf434b02d2bb46bb54e0c3e9569f0f8664aa4c6c6c499137cd6e2c53b8&height=300&width=600&legend=true",
    title: "Google Sign-Up Registrations",
  },
  {
    src: "https://us5.datadoghq.com/graph/embed?token=77b0630f43ba00d8477e707463159e71764ffc997aea6851026dcba744f33b31&height=300&width=600&legend=true",
    title: "Non-Google Sign-In Users",
  },
  {
    src: "https://us5.datadoghq.com/graph/embed?token=fcb03a27182c916eb7fe8b0e2c53c8ad7aa841c4a566d2672a158a6fc8a971ce&height=300&width=600&legend=true",
    title: "Failed Logins (Non-Google)",
  },
  {
    src: "https://us5.datadoghq.com/graph/embed?token=f63567bb8525e38adc5b5f6966c0cf116b02481efef6347bcaaa06525df54d48&height=300&width=600&legend=true",
    title: "Google Sign-In Users",
  },
  {
    src: "https://us5.datadoghq.com/graph/embed?token=fbbdc3ff98a2c2ad1f632fa401f0727de86f97ca0c6aa683f43fccb74c76a720&height=300&width=600&legend=true",
    title: "Blocked Users",
  },
  {
    src: "https://us5.datadoghq.com/graph/embed?token=0e46c3dd4f65bacc7922a23528bf1a19e8a89ac07c1b0e5818be5e83dfa9e7f8&height=300&width=600&legend=true",
    title: "Average Block Duration per Use",
  },
  {
    src: "https://us5.datadoghq.com/graph/embed?token=927745b8002afe8d7e4bcb74bc110d15d8d987b039283f4ae5e73b66f6a92f57&height=300&width=600&legend=true",
    title: "Password Reset Requests",
  },
  {
    src: "https://us5.datadoghq.com/graph/embed?token=32f37dcbb617b6e0caecad34ab8311908e4331dc0e0f5093a0a94a84383d4cf5&height=300&width=600&legend=true",
    title: "Successful Password Resets",
  },
  {
    src: "https://us5.datadoghq.com/graph/embed?token=10be2ae5313a58a3ec8cc79c521348751cac283219717064c06e62bc071f942a&height=300&width=600&legend=true",
    title: "Average Password Reset Time",
  },
];

export const UserMetrics = () => {
  return (
    <div className="user_metrics">
      <div>
        <h1 className="title">User Analytics</h1>
        <IframeList iframes={iframes} />
      </div>
    </div>
  );
};
