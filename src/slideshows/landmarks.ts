import ayersRock from "../images/ayers-rock.jpeg";
import bigBen from "../images/big-ben.jpeg";
import capitolHill from "../images/capitol-hill.jpeg";
import greatWallOfChina from "../images/great-wall-of-china.jpeg";
import londonEye from "../images/london-eye.jpeg";
import statueOfLliberty from "../images/statue-of-liberty.jpeg";
import { Slide } from "../models/slide";

export const alphabet: Slide[] = [
    {
        letter: "a",
        availableContents: [
            {
                image: ayersRock,
                name: "Ayers Rock"
            }
        ]
    },
    {
        letter: "b",
        availableContents: [
            {
                image: bigBen,
                name: "Big Ben"
            }
        ]
    },
    {
        letter: "c",
        availableContents: [
            {
                image: capitolHill,
                name: "Capitol Hill"
            }
        ]
    },
    {
        letter: "g",
        availableContents: [
            {
                image: greatWallOfChina,
                name: "Great Wall of China"
            }
        ]
    },
    {
        letter: "l",
        availableContents: [
            {
                image: londonEye,
                name: "London Eye",
                description: "The London Eye is an observation wheel on the South Bank of the River Thames in London. It is Europe's tallest cantilevered observation wheel, and is the most popular paid tourist attraction in the United Kingdom with over 3.75 million visitors annually. "
            }
        ]
    },
    {
        letter: "s",
        availableContents: [
            {
                image: statueOfLliberty,
                name: "Statue of Liberty"
            }
        ]
    },
];
