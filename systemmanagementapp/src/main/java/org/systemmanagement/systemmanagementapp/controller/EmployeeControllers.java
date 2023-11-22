package org.systemmanagement.systemmanagementapp.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.systemmanagement.systemmanagementapp.entity.Employee;
import org.systemmanagement.systemmanagementapp.exception.UserNotFoundException;
import org.systemmanagement.systemmanagementapp.service.EmployeeService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin("http://localhost:5173")
public class EmployeeControllers {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/save")
    public ResponseEntity<Employee> register(@RequestBody @Valid Employee employee){
        Employee saveToDb = employeeService.register(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body(saveToDb);
    }
    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllUsers(){
        List<Employee> employees = employeeService.getAllUsers();
        return ResponseEntity.status(HttpStatus.OK).body(employees);
    }
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long employeeId) throws UserNotFoundException{
        Employee employeeById = employeeService.getEmployeeById(employeeId);
        return ResponseEntity.status(HttpStatus.OK).body(employeeById);
    }
    @PutMapping("/update/{employeeId}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long employeeId,@RequestBody Employee newEmployee) throws UserNotFoundException{
        Employee updatedById = employeeService.updateEmployee(employeeId,newEmployee);
        return ResponseEntity.status(HttpStatus.OK).body(updatedById);
    }
    @DeleteMapping("/delete/{employeeId}")
    public ResponseEntity<Map<String,String>> deleteEmployee(@PathVariable Long employeeId) throws UserNotFoundException{
        Map<String,String> employee = 
        employeeService.deleteEmployee(employeeId);
        return ResponseEntity.status(HttpStatus.OK).body(employee);
    }
    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<String> handleException(UserNotFoundException e){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Map<String,String>> handleValidationExceptions(MethodArgumentNotValidException  e){

        Map<String,String> errors = new HashMap<>(); 
        e.getBindingResult().getFieldErrors().forEach(error -> {
            errors.put(error.getField(),error.getDefaultMessage());
        }
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    } 
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
    }

}
