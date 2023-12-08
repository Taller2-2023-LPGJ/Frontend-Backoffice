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
    <div style={{ overflowX: 'auto', overflowY: 'hidden', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
        {iframes.map((iframe, index) => (
          <div key={index} style={{ width: '50%', padding: '10px', boxSizing: 'border-box' }}>
            <h3>{iframe.title}</h3>
            <iframe src={iframe.src} width="100%" height="305" title={iframe.title}></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

const iframes: IframeInfo[] = [
  {
    src: "https://us5.datadoghq.com/graph/embed?token=048e3a867ec5b39d83b2c5e11419aa84b70290db68911c326454d12442a13d3d&height=300&width=600&legend=true",
    title: "New registered users",
  },
  {
    src: "https://us5.datadoghq.com/graph/embed?token=e17b70304afbf1ed288f4ad6bce9d854443daa80315fbc4979c2d7490ae6c596&height=300&width=600&legend=true",
    title: "Avg user recover password time",
  },
  {
    src: "https://us5.datadoghq.com/graph/embed?token=e17b70304afbf1ed288f4ad6bce9d854443daa80315fbc4979c2d7490ae6c596&height=300&width=600&legend=true",
    title: "Title 1",
  },
  {
    src: "https://us5.datadoghq.com/graph/embed?token=e17b70304afbf1ed288f4ad6bce9d854443daa80315fbc4979c2d7490ae6c596&height=300&width=600&legend=true",
    title: "Title 1",
  },
  {
    src: "https://us5.datadoghq.com/graph/embed?token=e17b70304afbf1ed288f4ad6bce9d854443daa80315fbc4979c2d7490ae6c596&height=300&width=600&legend=true",
    title: "Title 1",
  },
  {
    src: "https://us5.datadoghq.com/graph/embed?token=e17b70304afbf1ed288f4ad6bce9d854443daa80315fbc4979c2d7490ae6c596&height=300&width=600&legend=true",
    title: "Title 1",
  },
  {
    src: "https://us5.datadoghq.com/graph/embed?token=e17b70304afbf1ed288f4ad6bce9d854443daa80315fbc4979c2d7490ae6c596&height=300&width=600&legend=true",
    title: "Title 1",
  },
  {
    src: "https://us5.datadoghq.com/graph/embed?token=e17b70304afbf1ed288f4ad6bce9d854443daa80315fbc4979c2d7490ae6c596&height=300&width=600&legend=true",
    title: "Title 1",
  }
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
