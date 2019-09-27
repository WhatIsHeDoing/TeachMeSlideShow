import { KEY_LEFT, KEY_RIGHT } from "keycode-js";
import React, { useState } from "react";
import EventListener from "react-event-listener";
import { useSwipeable, EventData } from "react-swipeable";

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

    const changeSlide = (direction: "left" | "right") => {
        let newSlideIndex = slideIndex;

        if (direction === "right") {
            newSlideIndex = slideIndex >= alphabet.length - 1 ? 0 : slideIndex + 1;
        } else {
            newSlideIndex = slideIndex <= 0 ? alphabet.length - 1 : slideIndex - 1;
        }

        setSlideIndex(newSlideIndex);
        const nextSlide = alphabet[newSlideIndex];
        setSlide(nextSlide);
        setContents(randomArrayElement(nextSlide.availableContents));
        setAnimation(randomArrayElement(animationClasses));
    };

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.keyCode === KEY_RIGHT) {
            return changeSlide("right");
        }

        if (event.keyCode === KEY_LEFT) {
            return changeSlide("left");
        }
    }

    const onSwiped = ({ dir }: EventData) => {
        if (dir === "Right") {
            return changeSlide("right");
        }

        if (dir === "Left") {
            return changeSlide("left");
        }
    }

    const handlers = useSwipeable({ onSwiped });

    return (
        <div className="App">
            <EventListener target="window" onKeyDown={onKeyDown} />
            <section {...handlers} style={{ backgroundImage: `url(${contents.image})` }}>
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
