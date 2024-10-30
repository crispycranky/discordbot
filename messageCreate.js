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
                    "thats dope",
                    "this is so ghetto 💔",
                    "w haha",
                    "this pic is gas",
                    "stupid pic",
                    "this is a really bad pic",
                    "massive L {username}",
                    "this is a super cute pic do they make it for men?",
                    "dont care for this pic",
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

                // Choose a random reply and replace `{username}` with the actual username
                let reply = replies[Math.floor(Math.random() * replies.length)];
                reply = reply.replace("{username}", message.author.username);

                // Send the reply with a random delay between 3 and 5 seconds
                const delay = Math.floor(Math.random() * 2000) + 3000;
                setTimeout(() => {
                    message.channel.send(reply);
                }, delay);

                return;  // Stop after the first match to avoid multiple replies
            }
        }
    },
};
