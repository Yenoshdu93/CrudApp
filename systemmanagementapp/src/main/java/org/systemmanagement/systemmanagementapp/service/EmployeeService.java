package org.systemmanagement.systemmanagementapp.service;

import java.util.List;
import java.util.Map;

import org.systemmanagement.systemmanagementapp.entity.Employee;
import org.systemmanagement.systemmanagementapp.exception.UserNotFoundException;

public interface EmployeeService {

    public Employee register(Employee employee);

    public List<Employee> getAllUsers();

    public Employee getEmployeeById(Long employeeId) throws UserNotFoundException;

    public Employee updateEmployee(Long employeeId, Employee newEmployee) throws UserNotFoundException;

    public Map<String,String> deleteEmployee(Long employeeId) throws UserNotFoundException;

}
