import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './customers.entity';
import { CreateCustomerDto } from './customers.validation';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from './pagination.dto';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiOperation({ summary: 'List all customers' })
  @ApiResponse({ status: 200, description: 'Listed customers' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({
    name: 'sort',
    required: false,
    enum: ['id', 'name', 'salary', 'companyValue'],
  })
  @ApiQuery({ name: 'order', required: false, enum: ['ASC', 'DESC'] })
  @ApiQuery({ name: 'selected', required: false, type: Boolean })
  @Get()
  findAll(
    @Query() pagination: PaginationDto,
    @Query('sort') sort?: 'id' | 'name' | 'salary' | 'companyValue',
    @Query('order') order?: 'ASC' | 'DESC',
    @Query('selected') selected?: boolean,
  ): Promise<{ data: Customer[]; count: number }> {
    return this.customersService.findAll({
      pagination,
      sort,
      order,
      filters: { selected },
    });
  }

  @ApiOperation({ summary: 'Find one customer' })
  @ApiResponse({ status: 200, description: 'Customer found' })
  @ApiResponse({ status: 400, description: 'Customer not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Customer | null> {
    return this.customersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Create new customer' })
  @ApiResponse({ status: 201, description: 'Customer created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post()
  create(@Body() customer: CreateCustomerDto): Promise<Customer> {
    return this.customersService.create(customer);
  }

  @ApiOperation({ summary: 'Update customer' })
  @ApiResponse({ status: 200, description: 'Customer found' })
  @ApiResponse({ status: 400, description: 'Customer not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() customer: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.update(+id, customer);
  }

  @ApiOperation({ summary: 'Delete customer' })
  @ApiResponse({ status: 200, description: 'Customer deleted' })
  @ApiResponse({ status: 400, description: 'Customer does not exists' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.customersService.remove(+id);
  }
}
