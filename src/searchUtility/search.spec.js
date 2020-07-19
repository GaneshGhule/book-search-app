import { KMPSearch } from './search';

test('KMP Search : Should return 100', () => {
    expect(KMPSearch("How are you", "are")).toBe(100);
})

test('KMP Search : Should return 0', () => {
    expect(KMPSearch("How are you", "is")).toBe(0);
})


test('KMP Search : Should return 0', () => {
    expect(KMPSearch(

        "The Book in Three Sentences:\u00a0Some environments provide more starting materials " +
        "and more favorable conditions for utilizing inventions and building societies than other environments." +
        "This is particularly notable in the rise of European peoples, which occurred because of environmental " +
        "differences and not because of biological differences in the people themselves. There are four primary " +
        "reasons Europeans rose to power and conquered the natives of North and South America, and not the other " +
        "way around: 1) the continental differences in the plants and animals available for domestication, " +
        "which led to more food and larger populations in Europe and Asia, 2) the rate of diffusion of " +
        "agriculture, technology and innovation due to the geographic orientation of Europe and Asia (east-west) " +
        "compared to the Americas (north-south), 3) the ease of intercontinental diffusion between Europe, Asia, and Africa, and 4)" +
        "the differences in continental size, which led to differences in total population size and technology diffusion.",

        "total population size and technology diffusion"
    )

    ).toBe(100);
})


test('KMP Search : Should return 0', () => {
    expect(KMPSearch(

        "The Book in Three Sentences:\u00a0Some environments provide more starting materials " +
        "and more favorable conditions for utilizing inventions and building societies than other environments." +
        "This is particularly notable in the rise of European peoples, which occurred because of environmental " +
        "differences and not because of biological differences in the people themselves. There are four primary " +
        "reasons Europeans rose to power and conquered the natives of North and South America, and not the other " +
        "way around: 1) the continental differences in the plants and animals available for domestication, " +
        "which led to more food and larger populations in Europe and Asia, 2) the rate of diffusion of " +
        "agriculture, technology and innovation due to the geographic orientation of Europe and Asia (east-west) " +
        "compared to the Americas (north-south), 3) the ease of intercontinental diffusion between Europe, Asia, and Africa, and 4)" +
        "the differences in continental size, which led to differences in total population size and technology diffusion.",

        "biological differences in the human"
    )

    ).toBe(86);
})