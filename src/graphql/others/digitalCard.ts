import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import DigitalCardService from "../../services/digitalcard";
import AccountService from "../../services/account";
// import TransactionService from "../../services/transaction";
import Locationservice from "../../services/location";

const digitalcard_query = `#graphql
    getCard: Response
`
const digitalcard_mutation = `#graphql
    createCard(data:DigitalCardInput!): Response
`
const queries = {

    getCard: async (parent:any, args:any, context:any) => {
        console.log("Args:Outside for digitalCard", args);
        try {
            
            const card = await DigitalCardService.getDigitalCard(context.user.id );
            console.log("the card outside",card)
            return new ApiResponse(200, "Card Fetched", card);
        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    }
}
const mutations = {

    createCard: async (parent:any, args:any, context:any) => {
        console.log("Args:Outside", args.data);
        try {
            const latitude = Math.round(args.data.latitude * 1000) / 1000;
            const longitude = Math.round(args.data.longitude * 1000) / 1000;
            
            const location = await Locationservice.addLocationDetails(latitude, longitude);
            if (!location) {
                throw new ApiError(404, "Location not regsiterded", {}, false);
            }
            const card = await DigitalCardService.applyDigitalCard({id:context.user.id,locationId:location.id,...args.data});
            // console.log("the card outside",card)
            // const blockTransaction=await TransactionService.applyForCard({ cardId:card?.cardId, agencyId:card?.agencyId,userId:context.user.id } )
            // console.log(blockTransaction);
            return new ApiResponse(201, "Application Received", card)
        }
        catch (err: any) {
            throw new ApiError(500, err.message, {}, false);
        }
    }
}
export const DigitalCard = {
    queries: digitalcard_query,
    mutations: digitalcard_mutation,
    resolvers: {
        queries: queries,
        mutations: mutations
    }
}