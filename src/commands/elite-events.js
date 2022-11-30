const { SlashCommandBuilder } = require("@discordjs/builders");
const Interaction = require("../utils/interaction");
const { embed } = require("../utils/discord");

const TROOP_VALUES = Object.freeze({
  "T3": 5,
  "T4": 15,
  "WEAPON": 30
})

const TROOP_LABELS = Object.freeze({
  "T3": "Elite Troops (T3)",
  "T4": "Royal Troops (T4)",
  "WEAPON": "Valyrian Steel Weapon"
})

module.exports = {
  data: new SlashCommandBuilder()
    .setName("challenge-quests-training")
    .setDescription("Computes troops needed for Challenge Quests")
    .addIntegerOption((option) =>
      option
        .setName("motivation")
        .setDescription("Motivation amount from Challenge Quests")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("points")
        .setDescription("Points required to complete the Challenge Quests")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Any message you want to add.")
    ),
  async execute(interaction) {
    const action = new Interaction(interaction);
    const {
      ELITE_EVENTS,
    } = action.getBotConfigs();
    const motivation = action.getOptions().getInteger("motivation");
    const points = action.getOptions().getInteger("points");
    const message = action.getOptions().getString("message");

    const eliteRole =  await action.getRoleId(ELITE_EVENTS)
    const eliteRoleTag =  await action.getRoleTag(ELITE_EVENTS)
    let messageContent = `${eliteRoleTag} `
    const embedContent = Object.entries(TROOP_VALUES).map(value => {
      const[id, troopValue] = value
      return {
        name: TROOP_LABELS[id],
        value: String(Number(points) / troopValue)
      }
    })
    // Attach additional message if there is any
    if (message) {
      messageContent += message
    }
    console.log(eliteRoleTag)
    interaction.reply({
      allowedMentions: { roles: [eliteRole] },
      embeds: [embed(embedContent, `${motivation} ⚡ ${points}`)],
      content: messageContent
    });
  },
};
