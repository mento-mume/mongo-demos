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
        name:{type:String, required:true},
        category:{
            type:String,
            required:true,
            enum:['web','mobile','backend']

        },
        author:String,
        tag:{
            type:Array,

            validate:{
                isAsync:true,
                validator:
                function(v,callback){

                    setTimeout(()=>{ 
                        const result = v && v.length>0;
                        callback(result);
                    },4000)
                   
                },
                message:'a course should have atleast one tag'
            
        }
        },
        date:{type:Date, default:Date.now},
        isPublished:Boolean,
        price:{type:Number, required: function(){return this.isPublished}}
    });

    const Course = new mongoose.model('Course',courseSchema);
    async function createCourse(){
        const course = new Course({
            name:'Angular Course',
            category:'_',
            author:'Mosh',
            tag:[],
            isPublished:true,
            price:10   
        });

        try {
            const result = await course.save();
            console.log(result);
            
        } catch (error) {
            for (field in error.errors){
                console.log(error.errors[field].message);
            }
            
        }

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
      * 0
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
        const course = await Course.findByIdAndUpdate(id,{
            $set:{
                     author:'jason',
                     isPublished:false
                 }
        },{new:true});         
      console.log(course);
    }

    async function deleteCourse(id){
        const result = await Course.deleteOne({_id:id});
        console.log(result);
    }
    createCourse();


    