package org.systemmanagement.systemmanagementapp.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.systemmanagement.systemmanagementapp.entity.Employee;
import org.systemmanagement.systemmanagementapp.exception.UserNotFoundException;
import org.systemmanagement.systemmanagementapp.respository.EmployeeRepository;

@Service
public class EmployeeServiceimp implements EmployeeService{
    
    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Employee register(Employee employee) {
       return employeeRepository.save(employee);
    }
    @Override
    public List<Employee> getAllUsers() {
       return employeeRepository.findAll();
    }
    @Override
    public Employee getEmployeeById(Long employeeId) throws UserNotFoundException {
        Optional<Employee> employee = employeeRepository.findById(employeeId);
        return employee.orElseThrow(()-> new UserNotFoundException("user not found with "+employeeId));
    }
    @Override
    public Employee updateEmployee(Long employeeId, Employee newEmployee) throws UserNotFoundException {
        Optional<Employee> emplyee = employeeRepository.findById(employeeId);

        if(emplyee.isPresent()){
            Employee emp = emplyee.get();

            emp.setFirstName(newEmployee.getFirstName());
            emp.setLastName(newEmployee.getLastName());
            emp.setEmail(newEmployee.getEmail());
            return employeeRepository.save(emp);
        }else{
            throw new UserNotFoundException("User not found with user "+employeeId);
        }

    }
    @Override
    public Map<String,String> deleteEmployee(Long employeeId) throws UserNotFoundException  {
         Optional<Employee> employee = employeeRepository.findById(employeeId);
         if(employee.isPresent()){
            employeeRepository.deleteById(employeeId);
            Map<String,String>  errors = new HashMap<>();
            errors.put("Deleted", "True");
            return errors;
         }else{
            throw new UserNotFoundException("User not found");
         }
    }
}
