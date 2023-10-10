import { Fragment, useState } from "react";
import { PasteItem } from "./PasteItemInterface";

interface ListOfPastesProps {
    allPastes: PasteItem[] | undefined;
}

function limitText(text: string, amount: number) {
    const splitText = text.split(" ", amount);
    const ellipses = "...";
    return splitText.join(" ") + ellipses;
}

function formatDate(date: string) {
    return date.substring(0, 10);
}

export function ListOfPastes({ allPastes }: ListOfPastesProps): JSX.Element {
    const [selectedPaste, setSelectedPaste] = useState<PasteItem | null>();

    const handleSummaryClick = (paste: PasteItem) => setSelectedPaste(paste);

    const handleCloseSummary = () => setSelectedPaste(null);

    const renderEachPaste =
        allPastes &&
        allPastes.map((paste) => (
            <Fragment key={paste.id}>
                <li>
                    <h3>{paste.title} Date created: </h3>
                    {formatDate(paste.creationDate)} Description:{" "}
                    {limitText(paste.description, 5)}
                    <button onClick={() => handleSummaryClick(paste)}>
                        Read More
                    </button>
                </li>
            </Fragment>
        ));
    return (
        <>
            <ol> {renderEachPaste}</ol>

            {selectedPaste && (
                <div className="selected-paste">
                    <h2 className="selected-paste-title">
                        {selectedPaste.title}
                    </h2>
                    <p className="selected-paste-description">
                        {selectedPaste.description}
                    </p>
                    <button
                        className="close-button"
                        onClick={() => handleCloseSummary()}
                    >
                        Close
                    </button>
                </div>
            )}
        </>
    );
}
