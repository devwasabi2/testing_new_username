// Dummy file to be changed later

// package com.bbd.BudgetPlanner.controller;

// import com.bbd.shared.models.Users;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.MockitoAnnotations;
// import org.springframework.http.ResponseEntity;

// import java.net.URI;

// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.mockito.ArgumentMatchers.any;
// import static org.mockito.Mockito.when;

// class UserProfileControllerTest {

// @Mock
// private CreateUserProfileService createUserProfileService;

// @BeforeEach
// void setUp() {
// MockitoAnnotations.openMocks(this);
// }

// @Test
// void testReturnSpecificWithNonExistentUser() {
// // Mock behavior
// Users request = new Users();
// request.setUsername("nonExistentUser");
// when(createUserProfileService.getUserByName("nonExistentUser")).thenReturn(java.util.Optional.empty());

// // Call the method under test
// ResponseEntity<?> responseEntity =
// userProfileController.returnSpecific(request);

// // Verify behavior
// assertEquals(ResponseEntity.notFound().build(), responseEntity);
// }
// }
