
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const moment = require('moment')
const db = require('./../models');
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID_KEY, process.env.TWILIO_AUTH_TOKEN);

module.exports = {
    booking: async (req, res) =>{
        console.log('hey')
        const {service, place, date, hour, name, email, phone, clientId, providerId, price, darden, tax, total, description, confirm, bookingId } = req.body
        try{
            const booking = new db.Bookings({service, place, date, hour, name, email, phone, clientId, providerId, price, darden, tax, total, description, confirm, bookingId })
            await booking.save();
            const firstMatch = await db.ApprovedUserProfile.find({'lat' : place.coordinates.lat, 'lng' : place.coordinates.lng}) //need to figure out how to match with people within 0.0050 longitude and latitude,
            let matched = []
            console.log(firstMatch)

            firstMatch.map(users=>{
                users.skills.map(skill=>{
                    if(skill === service){
                        if (matched.length < 3){
                            matched.push(users)
                        }
                    }
                })
            })
            console.log(matched)
            console.log("i got to here")
            await matched.map(user=>{
                console.log(user)
                client.messages
                    .create({
                        body: `Hey, a client just made a booking with booking number: ${bookingId} and he wants needs a ${service} for ${hour} on ${moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")} at ${place.place}, and the pay will be ${price}. If you would like to accept this job, respond to this text with "YES" plus the booking number ${bookingId}`,
                        from: process.env.TWILIO_PHONE_NUMBER,
                        to: user.phone
                    })
                    .then(message => console.log(message.sid));
            })
            console.log(matched)
            await res.json('success')
        }catch(e){
            res.status(404).json(e)
            console.log('something went wrong')
        }



    }
}