const messageMapper = (messageRow) => {
    return {
        messageId: messageRow['MessageId'],
        Pseudo: messageRow['Pseudo'],
        Content: messageRow['Content'],
        createDate: messageRow['CreateDate']
    }
};
module.exports = {
    messageMapper
};