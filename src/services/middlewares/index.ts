//@ts-nocheck
import { db } from "../../lib/db.config";
db.$use(async (params, next) => {
    if (params.model === 'caseRegister' && params.action === 'create') {
      const data = params.args.data;
      if (data.pincode) {
        const agency = await db.agency.findFirst({
          where: { pincode: data.pincode },
        });
  
        if (agency) {
          data.agencyId = agency.id;
        } else {
          throw new Error('No agency found with the given pincode');
        }
     }
    //
    console.log("CaseApplication create middleware");
    }
    return next(params);
});