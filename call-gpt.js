

const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: '', // This is the default and can be omitted
  });


let link = 'https://imagegpt.blob.core.windows.net/images/2404.15153v1-3.png-03.png?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-07-24T05:07:50Z&st=2024-07-23T21:07:50Z&spr=https&sig=QmKfYmTOeWVlz0jQ35m%2Bt0zUmH1squBqa7BC%2Bog16iA%3D'

async function main() {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "extract all text from the image" },
          {
            type: "image_url",
            image_url: {
              "url": link,
            },
          },
        ],
      },
    ],
  });
  console.log(response.choices);
}
main();