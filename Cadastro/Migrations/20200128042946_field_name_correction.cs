using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Cadastro.Migrations
{
    public partial class field_name_correction : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageBinary",
                table: "Pessoas");

            migrationBuilder.AddColumn<byte[]>(
                name: "Foto",
                table: "Pessoas",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Foto",
                table: "Pessoas");

            migrationBuilder.AddColumn<byte[]>(
                name: "ImageBinary",
                table: "Pessoas",
                type: "varbinary(max)",
                nullable: true);
        }
    }
}
