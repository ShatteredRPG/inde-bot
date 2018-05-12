function prefixHandler(msg, prefix, cmd, args) {
    if (cmd === `${prefix}mds`) {
        msg.channel.send("This is where I would tell you what you rolled via MDS if my programmers would ever get around to it.");
    }
    else if (cmd === `${prefix}roll` || cmd === `${prefix}r`) {
        // do basic roll logic
        msg.channel.send("This is where I would tell you what you rolled via dice if my programmers would ever get around to it.");
    }
}