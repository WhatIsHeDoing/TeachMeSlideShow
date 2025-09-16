import { CODE_LEFT, CODE_RIGHT } from "keycode-js";
import { FC, useState } from "react";
import EventListener from "react-event-listener";
import { useSwipeable } from "react-swipeable";
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

export const App: FC = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [slide, setSlide] = useState(alphabet[slideIndex]);
    const [contents, setContents] = useState(
        randomArrayElement(slide.availableContents)
    );
    const [animation, setAnimation] = useState(
        randomArrayElement(animationClasses)
    );

    const changeSlide = (direction: "left" | "right") => {
        const newSlideIndex =
            direction === "right"
                ? slideIndex >= alphabet.length - 1
                    ? 0
                    : slideIndex + 1
                : slideIndex < 1
                  ? alphabet.length - 1
                  : slideIndex - 1;

        setSlideIndex(newSlideIndex);
        const nextSlide = alphabet[newSlideIndex];
        setSlide(nextSlide);
        setContents(randomArrayElement(nextSlide.availableContents));
        setAnimation(randomArrayElement(animationClasses));
    };

    const onKeyDown = ({ code }: KeyboardEvent) => {
        switch (code) {
            case CODE_RIGHT:
                return changeSlide("right");
            case CODE_LEFT:
                return changeSlide("left");
            default:
                return;
        }
    };

    /** Swipes go the opposite direction to key presses! */
    const handlers = useSwipeable({
        onSwiped: ({ dir }) => {
            switch (dir) {
                case "Right":
                    return changeSlide("left");
                case "Left":
                    return changeSlide("right");
                default:
                    return;
            }
        }
    });

    return (
        <div className="App">
            <EventListener target="window" onKeyDown={onKeyDown} />
            <section
                {...handlers}
                style={{ backgroundImage: `url(${contents.image})` }}
            >
                <p
                    className={`animated infinite ${animation}`}
                    title={contents.name}
                >
                    {slide.letter.toUpperCase()}
                    {slide.letter}
                </p>
                {contents.description && (
                    <p className="description">{contents.description}</p>
                )}
            </section>
        </div>
    );
};
