import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { PostResolver } from "./post.resolver";

const postResolver: PostResolver = new PostResolver();


const postType = new GraphQLObjectType({
    name: 'post',
    fields: () => ({
        uuid: { type: GraphQLString },
        author: { type: GraphQLString },
        title: { type: GraphQLString },
        likes: { type: GraphQLInt },
        comments: { type: new GraphQLList(GraphQLString) }
    })
})

export const postSchema = new GraphQLSchema({

    query: new GraphQLObjectType({
        name: 'query',
        fields: {
            
            findAll: {
                type: new GraphQLList(postType),
                resolve: async (source, args, context) => {
                    return await postResolver.findAll();
                }
            },

            findOne: {
                type: postType,
                args: {
                    uuid: { type: GraphQLString }
                },
                resolve: async (source, args, context) => {
                    return await postResolver.findOne(args);
                }
            }

        }

    }),

    mutation: new GraphQLObjectType({
        name: 'mutation',
        fields: {

            create: {
                type: postType,
                args: {
                    title: { type: GraphQLString },
                    author: { type: GraphQLString }
                },
                resolve: async (source, args, context) => {
                    return await postResolver.create(args);
                }
            },

            delete: {
                type: GraphQLString,
                args: {
                    uuid: { type: GraphQLString }
                },
                resolve: async (source, args, context) => {
                    return await postResolver.delete(args);
                }
            }

        }
    })

})