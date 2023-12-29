import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

export default {
    Query: {
        students: async (parent, args, { db }, info) => {
            return await db.Student.find().sort({ regno: 1 });
        },
        marks: async (parent, args, { db }, info) => {
            return await db.Mark.find();
        },
        student: async (parent, args, { db }, info) => {
            return await db.Student.findOne({ regno: args.regno }).sort({ hid: 1 });
        },
    },
    Student: {
        marks: async (parent, args, { db }, info) => {
            return await db.Mark.find({ regno: parent.regno }).sort({ hid: 1 });
        },
    },
    Mutation: {
        updateMark: async (parent, args, { db }, info) => {
            const marks = await db.Mark.findOneAndUpdate(
                { hid: args.hid, regno: args.regno },
                {
                    $set: {
                        marks: args.mark,
                    },
                },
                { new: true }
            );

            console.log({ ...marks._doc });


            pubsub.publish('MARKS_UPDATED', {
                marksUpdated: { ...marks._doc },
            });

            return marks
        },
    },
    Subscription: {
        marksUpdated: {
            // More on pubsub below
            subscribe: () => pubsub.asyncIterator(['MARKS_UPDATED']),
        },
    }
};
