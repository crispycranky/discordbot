const fs = require('fs');

// Load responses from JSON file
const responses = JSON.parse(fs.readFileSync('responses.json', 'utf-8'));

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot) return;  // Ignore messages from other bots
         // Check if the message has an image attachment
         if (message.attachments.size > 0) {
            // Filter attachments to see if they are images
            const hasImage = message.attachments.some(attachment => {
                return attachment.contentType && attachment.contentType.startsWith('image');
            });

            if (hasImage) {
                // Send a typing indicator to mimic human typing
                await message.channel.sendTyping();
                const imageResponses = [
                    "this shit looks pretty sick ngl",
                    "thats fire",
                    " bet imms look at em",
                    "this is so ghetto 💔",
                    "w haha"
                ];
                const imageReply = imageResponses[Math.floor(Math.random() * imageResponses.length)];
                setTimeout(() => {
                    message.channel.send(imageReply);
                }, 5000); // Delay to mimic typing
                return;
            }
        }

        // Check if the message contains any keyword from the responses
        for (const [keyword, replies] of Object.entries(responses)) {
            if (message.content.toLowerCase().includes(keyword)) {
                // Send a typing indicator
                message.channel.sendTyping();

                // Send a random reply with a delay to mimic typing
                const reply = replies[Math.floor(Math.random() * replies.length)];
                setTimeout(() => {
                    message.channel.send(reply);
                }, Math.random(3000, 5000)); // Delay randomly between 1 and 5 seconds

                return;  // Stop after the first match to avoid multiple replies
            }
        }
    },
};
