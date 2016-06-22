package inacap.controllers;

import inacap.collection.CommentsCollection;
import inacap.collection.PostsCollection;
import inacap.models.Comment;
import inacap.models.Message;
import inacap.models.Post;
import inacap.requests.CommentRequest;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@Path("/posts/{postId}/comments")
public class CommentsController {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Comment> index(@PathParam("postId") int postId) {
        try {
            return CommentsCollection.fetch(postId);
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
            return new ArrayList<>();
        }
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response show(@PathParam("id") int id) {
        try {
            Comment comment = CommentsCollection.find(id);
            if (comment != null)
                return Response.ok(comment).build();
            return Response.status(404).entity(new Message("Comment not found")).build();
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
            return Response.status(500).entity(new Message(ex.getMessage())).build();
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response store(@PathParam("postId") int postId, CommentRequest req) {
        try {
            if (req == null)
                throw new Exception("Comment required");
            req.validate();
        } catch (Exception ex) {
            return Response.status(422).entity(new Message(ex.getMessage())).build();
        }

        try {
            Comment comment = CommentsCollection.store(postId, req.body);
            if (comment != null)
                return Response.ok(comment).build();
            throw new Exception("Something went wrong");
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
            return Response.status(500).entity(new Message(ex.getMessage())).build();
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") int id, CommentRequest req) {
        try {
            if (req == null)
                throw new Exception("Comment required");
            req.validate();
        } catch (Exception ex) {
            return Response.status(422).entity(new Message(ex.getMessage())).build();
        }

        try {
            Comment comment = CommentsCollection.replace(id, req.body);
            if (comment == null)
                return Response.status(404).entity(new Message("Comment not found")).build();
            return Response.status(200).entity(comment).build();
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
            return Response.status(500).entity(new Message(ex.getMessage())).build();
        }
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@PathParam("id") int id) {
        try {
            boolean removed = CommentsCollection.remove(id);
            if (removed)
                return Response.status(204).build();
            return Response.status(404).entity(new Message("Comment not found")).build();
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
            return Response.status(500).entity(new Message(ex.getMessage())).build();
        }
    }

}
