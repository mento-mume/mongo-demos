const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
        .then(()=>console.log('connected to database'))
        .catch(err =>console.error('could not connect to datatbase',err));

        const coursesSchema = new mongoose.Schema({
            tag:[String],
            date:{type:Date, default:Date.now},
            name:String,
            aothor:String,
            isPublished:Boolean,
            price:Number
        });

        const Course = new mongoose.model('Course',coursesSchema);
        async function getCourse(){
            return await Course
            .find({isPublished:true, tags:'backend'})
            .sort({name:1})
            .select({name:1, author:1})
        }

        async function run(){
            const course = await getCourse();
            console.log(course);

        }

        run();
        