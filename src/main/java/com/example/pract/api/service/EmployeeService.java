package com.example.pract.api.service;

import com.example.pract.api.dto.EmployeeDto;
import com.example.pract.api.dto.ProjectDto;
import com.example.pract.api.model.Employee;
import com.example.pract.api.model.Project;
import com.example.pract.api.repo.EmployeeRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    @Autowired
    private final EmployeeRepo employeeRepo;
   // @Autowired
   // private final DepartmentRepo departmentRepo;

    public List<Employee> getByLastName(String lastName) {
        return employeeRepo.findAllByLastName(lastName);
    }




    public Employee create(Employee employee) {
       // Department department = departmentRepo.findById(employee.getDepartment().getId()).orElse(null);
        Employee emp = new Employee();
        emp.setFirstName(employee.getFirstName());
        emp.setLastName(employee.getLastName());
        emp.setPosition(employee.getPosition());
      emp.setDepartment(employee.getDepartment());
        employeeRepo.save(emp);
        return emp;
    }

    public void delete(Long id) {
        Optional<Employee> employee = employeeRepo.findById(id);
        if (employee.isPresent()) {
            employeeRepo.deleteById(id);
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

    public List<EmployeeDto> getAll() {
        List<Employee> employees = employeeRepo.findAll();
        List<EmployeeDto> employeeDtos = new ArrayList<>();
        for (Employee employee : employees) {
            employeeDtos.add(toEmployeeDto(employee));
        }
        return employeeDtos;
    }

    public EmployeeDto toEmployeeDto(Employee employee) {
        EmployeeDto dto = new EmployeeDto();
        dto.setId(employee.getId());
        dto.setFirstName(employee.getFirstName());
        dto.setLastName(employee.getLastName());
        dto.setPosition(employee.getPosition());

        // Here's the null check for the department
        if(employee.getDepartment() != null) {
            dto.setDepartmentName(employee.getDepartment().getName());
        } else {
            dto.setDepartmentName("No Department"); // Or any default value
        }

        return dto;
    }
}
