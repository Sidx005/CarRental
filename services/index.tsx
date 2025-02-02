import { request, gql } from "graphql-request";
const masterurl = process.env.NEXT_PUBLIC_MASTER_URL as string;
console.log(masterurl); // This should now log the correct URL

export const getCarList = async () => {
  
  const query = gql`
    query CarLists {
      carLists {
        carAvg
        carBrand
        carList
        createdAt
        id
        name
        price
        publishedAt
        updatedAt
        image {
          url
        }
      }
    }
  `;
  const result = await request(masterurl, query);
  return result;
};

export const getStoreLocations = async () => {
  const query = gql`
    query storeLocation {
      storesLocations {
        address
      }
    }
  `;
  const result = await request(masterurl, query);
  return result;
};

export const booking = async (formData: any) => {
  const mutationquery = gql`
    mutation MyMutation {
      createBooking(
        data: {
          userName: "${formData.userName}",
          contactNumber: "${formData.contactNumber}",
          pickUpTime: "${formData.pickUpTime}",
          pickUpDate: "${formData.pickUpDate}",
          dropOffDate: "${formData.dropOffDate}",
          dropOffTime: "${formData.dropOffTime}",
          carId: { connect: { id: "${formData.carId}" } }
        }
      ) {
        id
      }
    }
  `;
  const result = await request(masterurl, mutationquery);
  return result;
};
