PeopleScreen Features
    - [X] The data array loaded and shown needs to come from the global Context Provider.
    - [] If the array is empty then a message should be displayed on the screen asking the user to add a first Person.
    - [X] When there is data available in the array, each Person should be displayed via a <FlatList>.
    - [X] Each item in the FlatList should show a full name plus the month and day from their date of birth.
    - [] The FlatList should be sorted by month first and then day. In other words, the People should be displayed in the order of their birthdays in the year.
    - [X] Each item in the FlatList also needs to have an icon that the user can tap to navigate to the IdeaScreen.
    - [X] When you navigate from the PeopleScreen to the IdeaScreen you need to pass the id of the person through Route params.
    - [X] There needs to be a FAB or nav header link to navigate to the AddPersonScreen.

AddPersonScreen Features
    - [X] The AddPersonScreen will use a TextInput and a DatePicker from https://hosseinshabani.github.io/react-native-modern-datepicker/ to collect the name and date of birth of the person being added.
    - [X] You can save the selected date as string or timestamp. See the notes in module 7.1 about doing this.
    - [X] Make sure that both the name and dob are provided before you save the person.
    - [] After a successful save, navigate back to the PersonScreen.
    - [] If the save fails, show a Modal about the error instead of navigating back.
    - [] The PersonScreen should show the updated list and include the newly created person after successfully saving.
    - [] There should be a Save and a Cancel button. The Cancel button returns the user to the PersonScreen.
    - [] Use KeyboardAvoidingView around each control in your form.

IdeaScreen Features
    - [] The IdeaScreen will display a list of all gift ideas for the selected person.
    - [] There should be a heading above the list that indicates which person is associated with the list of gifts.
    - [] Route params are used to get the id of the person.
    - [] There should be a method in the Context object for getting the list of ideas for a specific person based on the person id.
    - [] The list of ideas should be displayed in a FlatList.
    - [] If the list of ideas is empty then display a message about adding an idea.
    - [] There needs to be a FAB or a header link to navigate to the AddIdeaScreen. Remember to pass the person id to the AddIdeaScreen through Route params.
    - [] Each item in the FlatList should have a thumbnail version of the image, the text for the idea, and a delete button.
    - [] Pressing the delete button should call an async function in the Context object to remove the idea from the person and then update the full list.
    - [] Successfully deleting an idea should trigger a reload of the contents because the list of ideas is updated.
    - [] The thumbnail images should be the same aspect ratio as the images that were saved, just smaller.

AddIdeaScreen Features
    - [] The AddIdeaScreen will use a TextInput and a Camera component to save a name for the gift idea plus take a picture of the idea.
    - [] The images should be saved at an aspect ratio of 2:3. Save this value as a state variable or ref so you can use it later.
    - [] When taking the image from the camera use a value between 50 and 70% of the screen width as the image width. Then calculate the height based on the screen width percentage times the aspect ratio. These calculated values should be saved in your context object (state and async storage).
    - [] When taking the picture you will first need to get the Camera permissions using the hook or the method.
    - [] When taking the picture use the .getAvailablePictureSizesAsync() method to control the sizes used by the camera. See the notes in module 7.1 about this.
    - [] When returning from this screen to the PersonScreen be sure to navigate and send the person id back through Route params.
    - [] Make sure that both the text and the image values are provided before you save the idea.
    - [] The validation and saving should be done in a function inside the Context object.
    - [] There should be a Save and a Cancel button on the screen.
    - [] The Cancel button will send the user back to the PersonScreen without saving anything. However, you still need to pass the person id back through the Route params.
    - [] Use KeyboardAvoidingView around each control in your form.

General Features
    - [] There needs to be a single Stack.Navigator that loads the four screens.
    - [] There needs to be a single Context object that has a Provider in App.js wrapped around the Navigation stack.
    - [] All the functionality for validating and saving data in the Context object needs to be done inside functions that are inside of the Context Provider function and made available through the context hook.
    - [] All errors, confirmations, and warnings should be displayed through a <Modal> component. A good approach would be to create a component file for the Modal. Pass the type and message and buttons and functions to the component to customize the modal. Just import the component on each screen that needs it.
    - [] Every person and every gift need a unique id. You can use the expo-crypto module to generate the id with the randomUUID method.
    - [] Your app should have a custom SplashScreen and Launcher icon. You can use the Figma template from the link in module 5.2 to create these.

Optional Features (Choose TWO)
    - [] Add a Swipeable to the FlatList on the PeopleScreen page which will expose a delete button. When pressed, the button will call an async function in the Context object to delete a person. When successful the list should automatically update itself.
    - [] Tap image thumbnail to view in fullsized modal from the FlatList on the IdeaScreen page AND show the preview image on the AddIdeaScreen while taking the picture.
    - [] Implement a UI Kit on all screens. Use React Native Elements or React Native Paper or GlueStack.
    - [] Change the navigation between the list and add screens based on the OS. If Android, use a FAB to go to the screen for adding a person or adding an idea. If on iOS, use the header link.
    - [] After pictures are taken with the Camera, move them from the cache folder to the document folder for the app. This will make them a permanent image available the next time the app opens. See the notes in the Module 4.1 notes on how to use the FileSystem.moveAsync method to move the image file. When deleting an idea be sure to use the FileSystem.deleteAsync method to delete the image file too.