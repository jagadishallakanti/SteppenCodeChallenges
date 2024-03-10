import React, { useState } from 'react';

const TitleList = ({ titles, setSelectedTitle }) => {
    return (
        <div className="panel">
            {titles.map((title, index) => (
                <p key={index} className="panel-block" onClick={() => setSelectedTitle(title)}>
                    {title.title}
                </p>
            ))}
        </div>
    );
};

const ContentDisplay = ({ content }) => {
    return (
        <div className="content">
            {content ? content.map((item, index) => <p key={index}>{item}</p>) : <p>Click on a title to display its content.</p>}
        </div>
    );
};

export const TwoPaneList = ({ data }) => {
    const [selectedTitle, setSelectedTitle] = useState(null);

    const content = selectedTitle ? selectedTitle.content : null;

    return (
        <div className="columns">
            <div className="column is-one-third">
                <TitleList titles={data} setSelectedTitle={setSelectedTitle} />
            </div>
            <div className="column">
                <ContentDisplay content={content} />
            </div>
        </div>
    );
};