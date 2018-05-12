function getArgs(msg) {
    const args = message.content.slice(prefix.length).split(' ');
    const cmd = args.shift().toLowerCase();
    return { cmd, args };
}