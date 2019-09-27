import { KEY_LEFT, KEY_RIGHT } from "keycode-js";
import React, { useState } from "react";
import EventListener from "react-event-listener";

import "./App.css";
import { alphabet } from "./slideshows/animals";
import { randomArrayElement } from "./utils/random";

const animationClasses = [
    "bounce",
    "fadeIn",
    "flash",
    "jello",
    "rubberBand",
    "swing",
    "tada"
];

export const App: React.FC = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [slide, setSlide] = useState(alphabet[slideIndex]);
    const [contents, setContents] = useState(randomArrayElement(slide.availableContents));
    const [animation, setAnimation] = useState(randomArrayElement(animationClasses));

    const changeSlide = (event: KeyboardEvent) => {
        let newSlideIndex = slideIndex;

        switch (event.keyCode) {
            case KEY_RIGHT:
                newSlideIndex = slideIndex >= alphabet.length - 1 ? 0 : slideIndex + 1;
                break;

            case KEY_LEFT:
                newSlideIndex = slideIndex <= 0 ? alphabet.length - 1 : slideIndex - 1;
                break;

            default:
                return;
        }

        setSlideIndex(newSlideIndex);
        const nextSlide = alphabet[newSlideIndex];
        setSlide(nextSlide);
        setContents(randomArrayElement(nextSlide.availableContents));
        setAnimation(randomArrayElement(animationClasses));
    }

    return (
        <div className="App">
            <EventListener target="window" onKeyDown={changeSlide} />
            <section style={{ backgroundImage: `url(${contents.image})` }}>
                <p className={`animated infinite ${animation}`} title={contents.name}>
                    {slide.letter.toUpperCase()}
                    {slide.letter}
                </p>
                {contents.description && <p className="description">
                    {contents.description}
                </p>}
            </section>
        </div>
    );
};
