const mongoose = require('mongoose');
const { type } = require('os');

mongoose.connect('mongodb://localhost/playground', {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true,
})
    .then(()=>console.log('connected to mongodb....'))
    .catch(err => console.error('Could not connect to Mongodb...',err));

    const courseSchema = new mongoose.Schema({
        name:String,
        author:String,
        tag:[String],
        date:{type:Date, default:Date.now},
        isPublished:Boolean
    });

    const Course = new mongoose.model('Course',courseSchema);
    async function createCourse(){
        const course = new Course({
            name:'Angular Course',
            author:'Mosh',
            tag:['angular','frontend'],
            isPublished:true
    
        });

        const result = await course.save();
        console.log(result);

    }

    async function getCourses(){
        const courses = await Course
        .find({author:'Mosh',isPublished:true})
        .limit(10)
        .sort({name:1})
        .select({name:1,tag:1})
        console.log(courses);
    }

    /**
     * querry first approach
     * 
     * @param {*} id 
     * 
     * async function updateCourse(id){
        const course = await Course.findById(id);
        if(!course) return;

        course.isPublished = true;
        course.author = 'Another Author';

        const result = await course.save();
        console.log(result);
    }
     */

     /**
      * 
      * @param {*} id 
      * 
      *  async function updateCourse(id){
        const result = await Course.update({id},{
            $set:{
                author:'mosh',
                isPublished:false
            }
        });
        console.log(result)

    }
      */


    async function updateCourse(id){
        try {
            const course = await Course.findByIdAndUpdate({_id:id},{
                $set:{
                     author:'jason',
                     isPublished:false
                 }
             },{new:true});
             return course;
        } catch (error) {
            console.log(error);
        }


            
      //  console.log(course);
    }
    updateCourse('5a68fdf95db93f6477053ddd');
    