
import { Context, logging, storage, PersistentMap } from "near-sdk-as";


// What I think I need to store and assign the pumpkins
// Type nicknames 
type AccountId=string; 
type PumpkinId=i32;

// max number of pumpkins
const maxPumps=u64(200);

// registers
const pumpkinToOwner= new PersistentMap<PumpkinId,AccountId>('a');

const escrowAccess=new PersistentMap<AccountId,AccountId>('a');

const ownerToPumpkin=new PersistentMap<AccountId, i32[]>('pumpkinInfo')

const pumpkinBank=new PersistentMap<PumpkinId,string>('pumpkinBank')


// Checklist for tracking pumpkins
// pumpkinToOwner Tracks which token belongs to which account [minting a pumpkin, tranferring a pumpkin]
// ownerToPumpkin Tracks what pumpkins a particular account owns [minting a pumpkin, tranfering a pumpkin exchange and update old and new owner's lists]
// pumpkin Bank holds the drawing infomation for each pumpkin [only use for minting a new pumpkin]



// Total Supply Name
const Total_Supply:string='pumpkinVault'


// Stuff to send Pumpkins to other people 
export function transfer(new_owner_id:string, token_id:i32):void{
  const Sender =Context.sender;
  const owner=pumpkinToOwner.getSome(token_id)
  

  if(owner==Sender){

  logging.log('original sender confirmed conducting transfer')

  logging.log('updating pumpking registry')
  pumpkinToOwner.set(token_id,new_owner_id)

  logging.log('updating older user pumpkin inventory')
  let oldOwnersPumps=ownerToPumpkin.getSome(owner)
  oldOwnersPumps.splice(oldOwnersPumps.indexOf(token_id),1)
  ownerToPumpkin.set(owner,oldOwnersPumps)
  


  if(ownerToPumpkin.contains(new_owner_id)){
  logging.log('updating new user inventory')
  let newOwnersPumps=ownerToPumpkin.getSome(new_owner_id);
  newOwnersPumps.push(token_id)
  ownerToPumpkin.set(new_owner_id,newOwnersPumps)
  }else{
  logging.log('no new user inventory found gifting new pumpkin')
    ownerToPumpkin.set(new_owner_id,[token_id])
  }




  }
  else{
    logging.log("you're not the owner lolz")
  }
  
}


export function what():string {
  return Context.sender

}


// Stuff to verify pumpkin info
export function get_pumpkin_owner(token_id:PumpkinId):string{
  return pumpkinToOwner.getSome(token_id)
}


// Stuff to make/mint a new pump
export function mint_to(owner_id:AccountId,drawingInfo:string):u64{
  const tokenId=storage.getPrimitive<i32>(Total_Supply,1);

  pumpkinToOwner.set(tokenId,owner_id) // setting owner for this pumkin id 

  if(ownerToPumpkin.contains(owner_id)){
  let ownersPumps=ownerToPumpkin.getSome(owner_id);
  ownersPumps.push(tokenId)

  ownerToPumpkin.set(owner_id,ownersPumps) // updating this owners total pumpkins 
  }
  else{
    ownerToPumpkin.set(owner_id,[tokenId]) // if the owner doesn't yet own a pumpkin then create a new array 
  }

  //adding Pumpkin to Bank
  pumpkinBank.set(tokenId,drawingInfo)

  storage.set<i32>(Total_Supply,tokenId+1)

  return tokenId
}


export function getPumpkinDrawing(token_id:i32):string{
  return pumpkinBank.getSome(token_id)
}

export function getPumpkinInventory(owner:string):i32[] {
 return ownerToPumpkin.getSome(owner)
  
}

export function getTokenHeight():i32{
  return storage.getSome<i32>(Total_Supply)
}

export function SetDrawing(token_id:i32,drawing:string):void{
    pumpkinBank.set(token_id,drawing)

}


