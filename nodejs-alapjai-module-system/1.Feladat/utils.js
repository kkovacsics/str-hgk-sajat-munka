const increaseDate = (date, day = 3) => date.setDate(date.getDate() + day)

const increaseAndFormatDate = dates => 
    dates
        .map(date => increaseDate(date))
        .map(date => new Date(date).toLocaleDateString('hu-HU', {year: 'numeric', month: 'long', day: 'numeric'}))

module.exports = increaseAndFormatDate
