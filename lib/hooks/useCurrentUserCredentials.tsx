// import { useUser } from '@clerk/nextjs';

// const useCurrentUserCredentials = async (email:string) => {

//   console.log(user);
//   //   if (!user) {
//   //     throw new Error('User not found in Clerk');
//   //   }
//   //   const currentUserMongoId = findUserIdByEmail(
//   //     user.emailAddresses[0].emailAddress,
//   //   );
//   //   console.log(currentUserMongoId);
// };

// //   const getUserMongoId = async (email: string): Promise<string> => {
// //     const userId = await findUserIdByEmail(email);
// //     if (!userId) {
// //       throw new Error('User not found in MongoDB');
// //     }
// //     return userId;
// //   };

// //   const fetchUserCredentials = async () => {
// //     try {
// //       const currentUser = user;
// //       const currentUserMongoId = await getUserMongoId(
// //         currentUser.emailAddresses[0].emailAddress,
// //       );

// //       return {
// //         firstName: currentUser.firstName,
// //         lastName: currentUser.lastName,
// //         userId: currentUserMongoId,
// //         userSignature: currentUser.privateMetadata.signature,
// //       };
// //     } catch (error) {
// //       console.error(error);
// //       throw error;
// //     }

// //   return fetchUserCredentials;
// // };

// export default useCurrentUserCredentials;
