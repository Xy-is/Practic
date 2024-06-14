package com.example.pract.api.service;

import com.example.pract.api.model.Employee;
import com.example.pract.api.repo.EmployeeRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepo employeeRepo;

    public List<Employee> getByLastName(String lastName) {
        return employeeRepo.findAllByLastName(lastName);
    }


    public Employee create(Employee employee) {
        Employee emp = new Employee();
        emp.setFirstName(employee.getFirstName());
        emp.setLastName(employee.getLastName());
        emp.setPosition(employee.getPosition());
        emp.setDepartment(employee.getDepartment());
        employeeRepo.save(emp);
        return emp;
    }

    public void delete(String lastName) {
        List<Employee> employees = employeeRepo.findAllByLastName(lastName);
        for (Employee employee : employees) {
            employeeRepo.delete(employee);
        }
    }


    public Employee change(String lastName, String position) {
        Optional<Employee> employee = employeeRepo.findByLastName(lastName);
        if (employee.isPresent()) {
            Employee emp = employee.get();
            emp.setPosition(position);
            employeeRepo.save(emp);
            return emp;
        } else {
            return null;
        }
    }

    public List<Employee> getAll() {
        return employeeRepo.findAll();
    }
}
